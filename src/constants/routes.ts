const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/";
const ROOT_INVOICE = "/invoice";

export const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
};

export const PATH_INVOICE = {
  root: ROOT_INVOICE,
  templates: path(ROOT_INVOICE, "/templates"),
  create_invoice: path(ROOT_INVOICE, "/create-invoice"),
};
