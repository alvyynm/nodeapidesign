import prisma from "../utils/db";

// GET updates
export const getUpdates = async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

// GET one update
export const getOneUpdate = async (req, res, next) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

// UPDATE update
export const updateUpdate = async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "no matching id" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

// CREATE update
export const createUpdate = async (req, res, next) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });

  // if product doesn't belong to user
  if (!product) {
    return res.json({ message: "No products" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

// DELETE update
export const deleteUpdate = async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "no matching id" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
