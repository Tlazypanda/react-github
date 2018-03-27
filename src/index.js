import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
const fetch = require('node-fetch')


class App extends React.Component
{
constructor(props){
	super(props);
	this.state={
		username:"Anupam-Dagar",
		realName:"",
		avatar:"",
		location:"",
		followers:"",
		repos:"",
		url:"",
		notFound:""

	};
}


render(){
	return(
		<div>
		<Search fetchUser={this.fetchUser.bind(this)} />
		<Card data={this.state} />
	    </div>

);
}



fetchApi(url){
fetch(url).then(res=>res.json())
.then(data=>{
this.setState(
{
		  username: data.login,
          realName: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          url: data.html_url,
          notFound: data.message
});
})
.catch(err=>console.log("oh no!"));
						}

fetchUser(username)
{let url='https://api.github.com/users/${username}';
this.fetchApi(url);

}

componentDidMount() {
    let url = `https://api.github.com/users/${this.state.username}`;
    this.fetchApi(url);
  }

}


class Search extends React.Component{
render(){
return(
<form onSubmit={this.handleClick.bind(this)}>
<input ref="search" type="text" placeholder="Enter a username" />
	<input type="submit" value="submit" />

</form>
);
}




handleClick(e)
{
	e.preventDefault();
	console.log(this.refs.search.value)
	let username=this.refs.search.value;
	this.props.fetchUser(username);
	console.log(this.props.data);
	this.refs.search.value="";
	
}
}
		
class Card extends React.Component{
	render()
	{let data=this.props.data;
		return(
			<div>
			<a href={data.url} target="_blank">
            <img  src={data.avatar} />
            </a>
	 		<dl>
            <dt>Real name</dt>
            <dd>{data.realName}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Number of public repos</dt>
            <dd>{data.repos}</dd>

            <dt>Number of followers</dt>
            <dd>{data.followers}</dd>
          </dl>
        </div>
		);
	}
}






ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
