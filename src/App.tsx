import { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";

const initialColumns = [
  {
    id_client: "1",
    name: "Tech Innovations",
    description: "Empresa líder en soluciones tecnológicas innovadoras.",
    logo: "https://www.techinnovations.com/logo.png",
    skills: ["SQL", "Developer", "UI", "Design"],
    rubro: "Tecnología",
    contact: {
      direction: "Calle Ficticia 123, Ciudad, País",
      tel: "+123456789",
      email: "contacto@techinnovations.com",
      web: "https://www.techinnovations.com",
      social_network: {
        facebook: "https://facebook.com/techinnovations",
        twitter: "https://twitter.com/tech_innovations",
        linkedin: "https://linkedin.com/company/techinnovations",
      },
    },
    legal_information: {
      nif: "123456789",
      tipo_empresa: "Sociedad Anónima",
      fecha_creacion: "2015-05-01",
      estado_legal: "Activa",
    },
    members: [
      {
        user_id: "1",
        first_name: "Juan",
        last_name: "Pérez",
        full_name: "Juan Pérez",
        image: "https://mdbootstrap.com/img/new/avatars/1.jpg",
        email: "juan.perez@techinnovations.com",
        role: "Administrador",
        state: "activated",
        skills: ["SQL", "Developer"],
      },
      {
        user_id: "2",
        first_name: "John",
        last_name: "Doe",
        full_name: "John Doe",
        image: "https://mdbootstrap.com/img/new/avatars/2.jpg",
        email: "tonny@techinnovations.com",
        role: "User",
        state: "activated",
        skills: ["UI", "Design"],
      },
      {
        user_id: "3",
        first_name: "Marta",
        last_name: "Sánchez",
        full_name: "Marta Sánchez",
        image: "https://mdbootstrap.com/img/new/avatars/3.jpg",
        email: "jose@techinnovations.com",
        role: "User",
        state: "activated",
        skills: ["UI", "Design"],
      },
      {
        user_id: "4",
        first_name: "India",
        last_name: "Martínez",
        full_name: "India Martínez",
        image: "https://mdbootstrap.com/img/new/avatars/8.jpg",
        email: "jose@techinnovations.com",
        role: "User",
        state: "activated",
        skills: ["UI", "Design"],
      },
    ],
    projects: [
      {
        id: "1",
        name: "KANBAN WEB",
        columns: [
          {
            id: "1",
            name: "TO DO",
            color: "rowLogoA",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/001.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con clientesss",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "1" }, { user_id: "4" }],
                    tags: ["Developer", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/041.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "3",
                image: "https://mdbootstrap.com/img/new/standard/city/042.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "2",
            name: "IN PROGRESS",
            color: "rowLogoB",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/043.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "2",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "3",
            name: "DONE",
            color: "rowLogoC",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/045.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "1" }, { user_id: "4" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "4" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "1",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/046.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "high",
                    members: [{ user_id: "1" }, { user_id: "2" }],
                    tags: ["Developer", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "KANBAN MOVIL",
        columns: [
          {
            id: "1",
            name: "TO DOs",
            color: "rowLogoA",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/001.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "medium",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/041.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "1" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "3",
                image: "https://mdbootstrap.com/img/new/standard/city/042.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "4" }, { user_id: "1" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "2",
            name: "IN PROGRESSs",
            color: "rowLogoB",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/043.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "4" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "2",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "3",
            name: "DONEs",
            color: "rowLogoC",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/045.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "1",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/046.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id_client: "2",
    name: "Fantsal Innovations",
    description: "Empresa líder en soluciones tecnológicas innovadoras.",
    logo: "https://www.techinnovations.com/logo.png",
    skills: ["SQL", "Developer", "UI", "Design"],
    rubro: "Tecnología",
    contact: {
      direction: "Calle Ficticia 123, Ciudad, País",
      tel: "+123456789",
      email: "contacto@fantsalinnovations.com",
      web: "https://www.fantsalinnovations.com",
      social_network: {
        facebook: "https://facebook.com/fantsalinnovations",
        twitter: "https://twitter.com/fantsal_innovations",
        linkedin: "https://linkedin.com/company/fantsalinnovations",
      },
    },
    legal_information: {
      nif: "123456789",
      tipo_empresa: "Sociedad Anónima",
      fecha_creacion: "2015-05-01",
      estado_legal: "Activa",
    },
    members: [
      {
        user_id: "1",
        first_name: "Juan",
        last_name: "Pérez",
        full_name: "Juan Pérez",
        image: "https://mdbootstrap.com/img/new/avatars/1.jpg",
        email: "juan.perez@fantsalinnovations.com",
        role: "Administrador",
        state: "activated",
        skills: ["SQL", "Developer"],
      },
      {
        user_id: "2",
        first_name: "John",
        last_name: "Doe",
        full_name: "John Doe",
        image: "https://mdbootstrap.com/img/new/avatars/2.jpg",
        email: "tonny@fantsalinnovations.com",
        role: "User",
        state: "activated",
        skills: ["UI", "Design"],
      },
      {
        user_id: "3",
        first_name: "Marta",
        last_name: "Sánchez",
        full_name: "Marta Sánchez",
        image: "https://mdbootstrap.com/img/new/avatars/3.jpg",
        email: "jose@fantsalinnovations.com",
        role: "User",
        state: "activated",
        skills: ["UI", "Design"],
      },
    ],
    projects: [
      {
        id: "1",
        name: "FANTSAL WEB",
        columns: [
          {
            id: "1",
            name: "TO DO",
            color: "rowLogoA",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/001.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/041.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "3",
                image: "https://mdbootstrap.com/img/new/standard/city/042.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "2",
            name: "IN PROGRESS",
            color: "rowLogoB",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/043.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "2",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "3",
            name: "DONE",
            color: "rowLogoC",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/045.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "1" }, { user_id: "4" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "4" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "1",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/046.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "high",
                    members: [{ user_id: "1" }, { user_id: "2" }],
                    tags: ["Developer", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "FANTSAL MOVIL",
        columns: [
          {
            id: "1",
            name: "TO DOs",
            color: "rowLogoA",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/001.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/041.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "1" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "3",
                image: "https://mdbootstrap.com/img/new/standard/city/042.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "high",
                    members: [{ user_id: "4" }, { user_id: "1" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "2",
            name: "IN PROGRESSs",
            color: "rowLogoB",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/043.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "low",
                    members: [{ user_id: "3" }, { user_id: "4" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: true,
                  },
                ],
                members: [{ user_id: "2" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "2",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "3",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
          {
            id: "3",
            name: "DONEs",
            color: "rowLogoC",
            notes: [
              {
                id: "1",
                image: "https://mdbootstrap.com/img/new/standard/city/045.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "5" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "3" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "1",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
              {
                id: "2",
                image: "https://mdbootstrap.com/img/new/standard/city/046.webp",
                title: "Analizar requerimientos del cliente",
                description:
                  "Revisar las especificaciones y recopilar detalles adicionales.",
                checklist: [
                  {
                    id: "1",
                    title: "Reunión con cliente",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                  {
                    id: "2",
                    title: "Confirmar funcionalidades clave",
                    priority: "medium",
                    members: [{ user_id: "3" }, { user_id: "2" }],
                    tags: ["Rediseño", "UI"],
                    finished: false,
                  },
                ],
                members: [{ user_id: "1" }, { user_id: "2" }],
                tags: ["Investigación", "Alta Prioridad"],
                priority: "high",
                dates: { createdAt: "2025-03-01", deadline: "2025-03-10" },
                comments: [
                  {
                    id: "1",
                    user_id: "1",
                    text: "Esperando disponibilidad del cliente.",
                    replies: [],
                  },
                  {
                    id: "2",
                    user_id: "2",
                    text: "Revisando los documentos del cliente.",
                    replies: [],
                  },
                ],
                files: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const colorSequence = ["rowLogoA", "rowLogoB", "rowLogoC"];

export default function App() {
  const client = initialColumns[0];

  const dataClient = {
    id_client: client.id_client,
    name: client.name || "Nombre Desconocido",
    description: client.description || "Sin descripción",
    logo: client.logo || "",
    rubro: client.rubro || "Desconocido",
    contact: client.contact || "Sin contacto",
    legal_information: client.legal_information || "Sin información legal",
  };

  const usersClient = client.members;

  // 🔹 Ahora `projects` almacena la versión reactiva de los proyectos
  const [projects, setProjects] = useState(client.projects);
  const [selectedProject, setSelectedProject] = useState(projects[0]); // Selecciona el primer proyecto dinámicamente
  const [columns, setColumns] = useState(selectedProject.columns);

  // 🟢 Función para actualizar una columna en el estado
  const handleUpdateColumn = (updatedColumn: any) => {
    const updatedColumns = columns.map((col) =>
      col.id === updatedColumn.id ? updatedColumn : col
    );

    setColumns(updatedColumns);
    handleUpdateProject({ ...selectedProject, columns: updatedColumns });
  };
  // 🟢 Función para cambiar el proyecto desde Header
  const handleProjectChange = (projectId: string) => {
    const newProject = projects.find((p) => p.id === projectId);
    if (newProject) {
      setSelectedProject(newProject);
    }
  };

  // 🟢 Función para añadir una columna al proyecto seleccionado
  const handleAddProject = (newColumnName: string) => {
    const newColumn = {
      id: (selectedProject.columns.length + 1).toString(),
      name: newColumnName.toUpperCase(),
      color:
        colorSequence[selectedProject.columns.length % colorSequence.length],
      notes: [],
    };
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProject.id
          ? { ...p, columns: [...p.columns, newColumn] }
          : p
      )
    );
    setSelectedProject((prevSelected) => ({
      ...prevSelected,
      columns: [...prevSelected.columns, newColumn],
    }));
  };

  // 🟢 Función para actualizar el proyecto en `projects`
  const handleUpdateProject = (updatedProject: any) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  return (
    <>
      <Header
        selectedClient={dataClient}
        projects={projects} // 🔹 Ahora pasamos `projects`, no `projectsClient`
        onProjectChange={handleProjectChange}
      />
      <KanbanBoard
        usersClient={usersClient}
        selectedProject={selectedProject}
        handleUpdateProject={handleUpdateProject}
        handleAddProject={handleAddProject}
        handleUpdateColumn={handleUpdateColumn}
      />
    </>
  );
}
