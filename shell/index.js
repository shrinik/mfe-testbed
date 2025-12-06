export default {
  async fetch(request, env) {
    console.log("In shell request handler");
    return await env.MFE.fetch(request);
  },
};
