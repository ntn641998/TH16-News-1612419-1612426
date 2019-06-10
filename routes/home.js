
module.exports = (router) => {
  const { posts, users, categories, tags } = require("../server/defaultData")
  let navCategories
  function calNavCategories() {
    if (!navCategories) {
      navCategories = []
      categories.forEach(cate => {
        let tmp = cate
        tmp.childCategories = []
        categories.forEach(el => {
          if (el.id != cate.id && el.parent_categories) {
            for (let parent of el.parent_categories) {
              if (parent.id == tmp.id) {
                tmp.childCategories.push(el)
                break;
              }
            }
          }
        })
        if (!tmp.parent_categories || tmp.parent_categories.length == 0) {
          navCategories.push(tmp)
        }
      })
    }
  }


  router.get('/', (req, res) => {
    calNavCategories()
    res.render('vwHome/index', { posts, navCategories, havPartical: true });
  })

  router.get('/Technology', (req, res) => {
    calNavCategories()
    res.render('vwHomecategory', { posts, navCategories, categoryName: "technogoly", style: "category" })
  })

  router.get('/postDetail', (req, res) => {
    calNavCategories()
    res.render('vwHome/post-detail', { posts, navCategories, post_0: posts[0], post_1: posts[1], post_2: posts[2], post_3: posts[3], post_4: posts[4], categoryName: "Technology", style: "post-detail" })
  })

  // Chua tao profile.handlebar
  router.get('/profile', (req, res) => {
    res.render('vwHome/profile', { style: "profile" })
  })

  router.get('/contact', (req, res) => {
    calNavCategories()
    res.render('vwHome/contact', { navCategories, style: "contact" })
  })
  
}