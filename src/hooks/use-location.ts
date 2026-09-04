"use client";

import { useState, useEffect } from "react";

interface Location {
  city?: string;
  country?: string;
  countryCode?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<Location>({});

  useEffect(() => {
    const cached = sessionStorage.getItem("vybe-location");
    if (cached) {
      setLocation(JSON.parse(cached));
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const loc: Location = {
          city: data.city,
          country: data.country_name,
          countryCode: data.country_code,
        };
        sessionStorage.setItem("vybe-location", JSON.stringify(loc));
        setLocation(loc);
      })
      .catch(() => {
        setLocation({ country: "Your area" });
      });
  }, []);

  return location;
}
