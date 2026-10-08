import { useState } from "react";

import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import InputField from "../../components/InputField";
import LoadingState from "../../components/LoadingState";

import { getFrequentFlyerData } from "./flyerApi";

import { sanitizeText } from "../../utils/sanitize";
import { validateMemberId } from "../../utils/validation";
import { trackPortalInteraction } from "../../utils/analytics";

function FrequentFlyerPortal() {
  const [memberId, setMemberId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanMemberId = sanitizeText(memberId);
    const validationError = validateMemberId(cleanMemberId);

    setError("");
    setData(null);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await getFrequentFlyerData(cleanMemberId);

      if (
        result === null ||
        result === undefined ||
        (Array.isArray(result) && result.length === 0)
      ) {
        setData(null);
        setError("No data found");
        return;
      }

      setData(result);

      trackPortalInteraction();
    } catch (requestError) {
      setError(requestError?.message || "Unable to load your information");
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const cleanValue = sanitizeText(event.target.value);

    setMemberId(cleanValue);

    if (error) {
      setError("");
    }

    setData(null);
  }

  return (
    <section className="portal-page" aria-labelledby="portal-heading">
      <div className="portal-container">
        <header className="portal-header">
          <p className="portal-eyebrow">Frequent Flyer Services</p>

          <h1 id="portal-heading">Frequent Flyer Portal</h1>

          <p className="portal-description">
            Access your frequent flyer information using your member ID.
          </p>
        </header>

        <form className="member-search-form" onSubmit={handleSubmit} noValidate>
          <InputField
            id="member-id"
            label="Member ID"
            value={memberId}
            onChange={handleChange}
            error=""
            placeholder="FF-1001"
            disabled={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading}
            aria-label="Search frequent flyer information"
          >
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </form>

        <ErrorMessage
          message={error && error !== "No data found" ? error : ""}
        />

        {isLoading && <LoadingState />}

        {!isLoading && error === "No data found" && <EmptyState />}

        {!isLoading && data && (
          <section
            className="results-section"
            aria-labelledby="results-heading"
          >
            <h2 id="results-heading">Frequent Flyer Information</h2>

            <div className="results-card">
              {Object.entries(data).map(([key, value]) => (
                <div className="result-row" key={key}>
                  <span className="result-label">{formatLabel(key)}</span>

                  <span className="result-value">{formatValue(value)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase())
    .trim();
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return "Not available";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export { FrequentFlyerPortal };

export default FrequentFlyerPortal;
