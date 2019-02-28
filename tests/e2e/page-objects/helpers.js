const checkLiquidErrors = async (t, ctx) => {
  const bodyText = await ctx.Body.textContent;
  return t
    .expect(bodyText)
    .notContains('Liquid Error')
    .expect(bodyText)
    .notContains('RenderFormTag Error:')
    .expect(bodyText)
    .notContains('QueryGraphTag Error:')
    .expect(bodyText)
    .notContains('ExecuteQueryTagError:');
};

export { checkLiquidErrors };
