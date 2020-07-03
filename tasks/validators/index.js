module.exports = {
  pollution: data => data.split('\n').map(row => row.split(',')).filter(row => row.length === 57)
}
