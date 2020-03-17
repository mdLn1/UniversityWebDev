module.exports = paginationMiddleWare = (req, res, next) => {
  let { pageNo, itemsCount } = req.query;
  if (!itemsCount || itemsCount < 5) {
    itemsCount = 5;
  }
  if (!pageNo || pageNo < 1) {
    pageNo = 1;
  }
  if (isNaN(pageNo) || isNaN(itemsCount)) {
    pageNo = 1;
    itemsCount = 5;
  }
  pageNo = parseInt(pageNo);
  itemsCount = parseInt(itemsCount);
  req.query.pageNo = pageNo;
  req.query.itemsCount = itemsCount;
  next();
};
