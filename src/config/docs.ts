export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

export const docsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Glossary",
      href: "/glossary",
    },
  ],
  sidebarNav: [
    {
      title: "Chapter 1: Scope",
      items: [
        {
          title: "Introduction",
          href: "/docs/scope/introduction",
        },
        {
          title: "Glossary",
          href: "/docs/scope/glossary",
        },
      ],
    },
    {
      title: "Chapter 2: Aircraft Description",
      items: [
        {
          title: "General Aircraft Characteristics Data",
          href: "/docs/description/characteristics",
        },
        {
          title: "General Aircraft Dimensions",
          href: "/docs/description/dimensions",
        },
        {
          title: "Ground Clearances",
          href: "/docs/description/ground-clearances",
        },
        {
          title: "Interior Arrangements",
          href: "/docs/description/interior",
        },
        {
          title: "Cargo Compartments",
          href: "/docs/description/cargo",
        },
        {
          title: "Door Clearances and Location",
          href: "/docs/description/doors",
        },
        {
          title: "Escape Slides",
          href: "/docs/description/escape-slides",
        },
        {
          title: "Landing Gear",
          href: "/docs/description/landing-gear",
        },
        {
          title: "Power Plant",
          href: "/docs/description/power-plant",
        },
        {
          title: "Jacking",
          href: "/docs/description/jacking",
        },
      ],
    },
    {
      title: "Chapter 3: Aircraft Performance",
      items: [
        {
          title: "Payload / Range",
          href: "/docs/performance/payload-range",
        },
        {
          title: "Take-off Weight Limitation",
          href: "/docs/performance/take-off-weight",
        },
        {
          title: "Landing Field Length",
          href: "/docs/performance/landing-length",
        },
        {
          title: "Final Approach Speed",
          href: "/docs/performance/approach-speed",
        },
      ],
    },
    {
      title: "Chapter 4: Ground Maneuvering",
      items: [
        {
          title: "Turning Radii",
          href: "/docs/maneuvering/turning-radii",
        },
        {
          title: "Minimum Turning Radii",
          href: "/docs/maneuvering/minimum-radii",
        },
        {
          title: "Runway and Taxiway Turn Paths",
          href: "/docs/maneuvering/turn-paths",
        },
        {
          title: "Visibility from Cockpit",
          href: "/docs/maneuvering/visibility",
        },
      ],
    },
    {
      title: "Chapter 5: Terminal Servicing",
      items: [
        {
          title: "Typical Ramp Layouts",
          href: "/docs/servicing/ramp-layouts",
        },
        {
          title: "Ground Service Connections",
          href: "/docs/servicing/connections",
        },
        {
          title: "Turn Round Time Charts",
          href: "/docs/servicing/turn-round",
        },
        {
          title: "Ground Towing",
          href: "/docs/servicing/towing",
        },
      ],
    },
    {
      title: "Chapter 6: Operating Conditions",
      items: [
        {
          title: "Engine Exhaust Velocities",
          href: "/docs/operating/exhaust-velocities",
        },
        {
          title: "Engine Exhaust Temperatures",
          href: "/docs/operating/exhaust-temperatures",
        },
        {
          title: "Danger Areas of Engines",
          href: "/docs/operating/danger-areas",
        },
      ],
    },
    {
      title: "Chapter 7: Pavement Data",
      items: [
        {
          title: "Landing Gear Footprint",
          href: "/docs/pavement/footprint",
        },
        {
          title: "Maximum Pavement Loads",
          href: "/docs/pavement/loads",
        },
        {
          title: "ACN/PCN Reporting System",
          href: "/docs/pavement/acn-pcn",
        },
      ],
    },
    {
      title: "Chapter 10: Rescue & Fire Fighting",
      items: [
        {
          title: "General Information",
          href: "/docs/rescue/general",
        },
        {
          title: "Emergency Evacuation",
          href: "/docs/rescue/evacuation",
        },
      ],
    },
  ],
};
