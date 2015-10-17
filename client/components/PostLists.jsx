
PostItem = React.createClass({
    
	domain() {
		var a = document.createElement('a');
		a.href = this.props.post.url;
		return a.hostname;
	},

    
    
	render() {
		return ( 
          <div className="post">
            <div className="post-content">
              <h3><a href="{this.props.post.url}">{this.props.post.title}</a><span>{this.domain()}</span></h3>
            </div>
          </div>
	  )
	}	
})



PostsList = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
	    console.log("gettmeteor data");
		Meteor.subscribe('posts');
		return {
			posts: Posts.find().fetch()	
		}
	},
    
	postItems() {
		return _.map(this.data.posts, (post) => { 
			return <PostItem post={post} key={post._id}/>; 
		});
	},

  render() {
    return (
      
     <div className="posts">
			{this.postItems()}
      </div>      
    );
  }
});
