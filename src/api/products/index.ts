export default (app) => {
  app.post(
    `/tenant/:tenantId/products`,
    require('./productsCreate').default,
  );
  app.put(
    `/tenant/:tenantId/products/:id`,
    require('./productsUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/products/import`,
    require('./productsImport').default,
  );
  app.delete(
    `/tenant/:tenantId/products`,
    require('./productsDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/products/autocomplete`,
    require('./productsAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/products`,
    require('./productsList').default,
  );
  app.get(
    `/tenant/:tenantId/products/:id`,
    require('./productsFind').default,
  );
};
