function sortSelector(lastSelected) {
  switch (lastSelected) {
    case 'recent': {
      return { _id: 'desc' }
      break;
    }
    case 'asc': {
      return {name_en : 'asc'}
      break;
    }
    case 'desc': {
      return {name_en : 'desc'}
      break;
    }
    case 'category': {
      return 'category: 1'
      break;
    }
    case 'location': {
      return 'location: 1'
      break;
    }
    case 'rating': {
      return { rating: 'desc' }
      break;
    }
  }
}

module.exports = sortSelector