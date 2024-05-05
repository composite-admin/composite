export interface IClientProject {
  id: number;
  project_name: string;
  project_code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const data: IClientProject[] = [
  {
    id: 1,
    project_name: "Project 1",
    project_code: "P001",
    status: "active",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    project_name: "Project 2",
    project_code: "P002",
    status: "inactive",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    project_name: "Project 3",
    project_code: "P003",
    status: "active",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    project_name: "Project 4",
    project_code: "P004",
    status: "inactive",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    project_name: "Project 5",
    project_code: "P005",
    status: "active",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
  },
];
