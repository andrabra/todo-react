import localApi from "@/shared/api/tasks/local.js";
import serverApi from "@/shared/api/tasks/server.js";

const isLocal = import.meta.env.VITE_STATIC_BACKEND === "true";
const tasksApi = isLocal ? localApi : serverApi;

export default tasksApi;
