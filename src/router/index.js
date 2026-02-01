import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Professional from "../views/Professional.vue";
import WritingList from "../views/WritingList.vue";
import WritingDetail from "../views/WritingDetail.vue";
import Art from "../views/Art.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/professional", name: "professional", component: Professional },
    { path: "/writing", name: "writing", component: WritingList },
    { path: "/writing/:slug", name: "writing-detail", component: WritingDetail, props: true },
    { path: "/art", name: "art", component: Art },
  ],
  // nice UX: always scroll to top on navigation
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
