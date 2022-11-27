const ex = require('express')
const app = ex()
const bp = require('body-parser')
var _ = require('lodash');

const txt1 = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
const txt_about = '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"'

const posts = []



app.use(ex.static('public'))
app.use(bp.urlencoded({extended:true}))


app.set('view engine', 'ejs')


app.listen(3000,function(){
    console.log('On it...')
})


app.get('/', function(req,res){
    res.render('index', {
        p_1:txt1,
        posts:posts
    })
})
app.post('/', function(req,res){
    res.redirect('/')
})

app.get('/about', function(req,res){
    res.render('about', {
        p_about:txt_about
    })
})
app.post('/about', function(req,res){
    res.redirect('/about')
})

app.get('/contact', function(req,res){
    res.render('contact', {
        p_contact:txt_about
    })
})
app.post('/contact', function(req,res){
    res.redirect('/contact')
})
app.get('/compose', function(req,res){
    res.render('compose')
})
app.post('/compose', function(req,res){
    var val = req.body.postTitle
    var pos = req.body.postBody;
    var post = {
        title:val,
        body:pos
    }
    posts.push(post)
    res.redirect('/')
})

app.get('/posts/:postid',function(req,res){
   const requested = _.lowerCase(req.params.postid);
   posts.forEach(post => {
       var storedTitle = _.lowerCase(post.title)
        if(requested === storedTitle){
            res.render('posts', {
                post_title:post.title,
                post_body:post.body
            })
        }

   });
})