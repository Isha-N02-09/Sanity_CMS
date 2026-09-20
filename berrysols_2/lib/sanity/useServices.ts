"use client";

import {useEffect, useState} from "react";
import {services as fallbackServices, type Service} from "@/data/services";

export function useServices(): Service[] {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    fetch("/api/services", {cache: "no-store"})
      .then((response) => response.ok ? response.json() as Promise<Service[]> : null)
      .then((nextServices) => {
        if (nextServices !== null) setServices(nextServices);
      })
      .catch(() => undefined);
  }, []);

  return services;
}