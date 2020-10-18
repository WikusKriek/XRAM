import React from "react"
import * as Icon from "react-feather"

const horizontalMenuConfig = [
  
  {
    id: "apps",
    title: "Apps",
    type: "dropdown",
    icon: <Icon.Grid size={16} />,
    children: [
      {
        id: "chat",
        title: "Chat",
        type: "item",
        icon: <Icon.MessageSquare size={16} />,
        navLink: "/",
        permissions: ["admin", "editor"]
      }
      
      
      
    ]
  },
  {
    id: "forms-tables",
    title: "Tables",
    type: "dropdown",
    icon: <Icon.Edit3 size={16} />,
    children: [
      
      {
        id: "tables",
        title: "Tables",
        type: "dropdown",
        icon: <Icon.Server size={16} />,
        children: [
          
          {
            id: "aggrid",
            title: "agGrid Table",
            type: "item",
            icon: <Icon.Circle size={10} />,
            navLink: "/tables/agGrid",
            permissions: ["admin", "editor"]
          }
        ]
      }
    ]
  },
  {
    id: "charts-maps",
    title: "Charts & Maps",
    type: "dropdown",
    icon: <Icon.BarChart2 size={16} />,
    children: [
      {
        id: "charts",
        title: "Charts",
        type: "dropdown",
        badge: "success",
        badgeText: "3",
        icon: <Icon.PieChart size={16} />,
        children: [
          {
            id: "apex",
            title: "Apex",
            type: "item",
            icon: <Icon.Circle size={10} />,
            navLink: "/charts/apex",
            permissions: ["admin", "editor"]
          },
          
          {
            id: "recharts",
            title: "Recharts",
            type: "item",
            icon: <Icon.Circle size={10} />,
            navLink: "/charts/recharts",
            permissions: ["admin", "editor"]
          }
        ]
      }
    ]
  }
]

export default horizontalMenuConfig
