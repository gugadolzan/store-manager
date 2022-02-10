const productsController = {
  create: [
    {
      description: "when the payload misses an attribute",
      tests: [
        {
          payload: {},
          errorMessage: '"name" is required',
        },
        {
          payload: { quantity: 10 },
          errorMessage: '"name" is required',
        },
        {
          payload: { name: "produto" },
          errorMessage: '"quantity" is required',
        },
      ],
    },
    {
      description: "when the attribute 'name' has a length less than 5",
      tests: [
        {
          payload: { name: "pro", quantity: 100 },
          errorMessage: '"name" length must be at least 5 characters long',
        },
      ],
    },
    {
      description: "when the attribute 'quantity' is invalid",
      tests: [
        {
          payload: { name: "produto", quantity: "string" },
          errorMessage: '"quantity" must be a number larger than or equal to 1',
        },
        {
          payload: { name: "produto", quantity: -1 },
          errorMessage: '"quantity" must be a number larger than or equal to 1',
        },
        {
          payload: { name: "produto", quantity: 0 },
          errorMessage: '"quantity" must be a number larger than or equal to 1',
        },
      ],
    },
  ],
};

module.exports = {
  productsController,
};
