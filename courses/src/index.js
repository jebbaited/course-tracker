import { Router } from "itty-router";
import { createCors } from "itty-cors";
import { error } from "itty-router-extras";

import { createCourse } from "./createCourse";
import { getCourses } from "./getCourses";
import { deleteCourse } from "./deleteCourse";
import { updateCourse } from "./updateCourse";

const submitHandler = async (request) => {
  return await createCourse(request);
};

const getCoursesHandler = async (request) => {
  const data = await getCourses(request);
  return new Response(data);
};

const deleteCoursesHandler = async (request) => {
  return await deleteCourse(request);
};

const updateCoursesHandler = async (request) => {
  return await updateCourse(request);
};

const router = Router();

const { preflight, corsify } = createCors({
  origins: ["*"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

router
  .options("*", preflight)
  .post("/submit", submitHandler)
  .get("/api/courses", getCoursesHandler)
  .put("/api/courses/:id", updateCoursesHandler)
  .delete("/api/courses/:id", deleteCoursesHandler)
  .all("*", () => new Response("Not found", { status: 404 }));

addEventListener("fetch", (e) => {
  e.respondWith(
    router
      .handle(e.request, e)
      .then(corsify)
      .catch((err) => {
        return error(500, err.stack);
      })
  );
});
