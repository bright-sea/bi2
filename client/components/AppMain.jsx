AppMain = React.createClass({
  
  render() {
    return (
      <div className="container">
        <Header />
        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
});
