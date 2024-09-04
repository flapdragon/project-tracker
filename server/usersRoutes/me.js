const me = (req, res, next) => {
  res.status(200).send(req.user)
}

export default me