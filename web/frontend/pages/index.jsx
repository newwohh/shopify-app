import React from "react";
import { Page } from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import ShowAllBadges from "../components/Badges/ShowAllBadges";

export default function HomePage() {
  return (
    <Page>
      <ShowAllBadges />
    </Page>
  );
}
