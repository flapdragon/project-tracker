const me = (req, res, next) => {
  res.send(req.user)
}

export default me