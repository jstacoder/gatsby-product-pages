(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{158:function(e,t,a){"use strict";a.r(t);a(186);var n=a(0),r=a.n(n),s=a(60),o=a(173),i=a(207);t.default=function(e){return r.a.createElement(o.a,{location:"/category/"+e.pageContext.category},r.a.createElement(i.Container,null,r.a.createElement(i.Row,null,r.a.createElement(i.Column,{textCentered:!0,xs:12},r.a.createElement(i.Jumbotron,null,r.a.createElement("h2",null,e.pageContext.category)))),r.a.createElement(i.Row,null,r.a.createElement(i.Column,null,r.a.createElement(i.Button,{dark:!0,border:!0,link:!0},r.a.createElement(s.Link,{to:"/product/"+e.pageContext.product.name},e.pageContext.product.name))))))}},168:function(e,t,a){"use strict";a(60);var n=a(0),r=a.n(n);a(176);t.a=function(e){e.author,e.title;return r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"container"},r.a.createElement("hr",{className:"border-primary"})))}},169:function(e,t){(function(t){e.exports={siteMetadata:{title:"Your Store",description:"Gatsby starter for a store",siteUrl:"https://jstacoder.github.io/gatsby-product-pages",author:"jstacoder",twitter:"jstacoder",adsense:""},pathPrefix:"gatsby-product-pages/",plugins:[{resolve:"gatsby-source-filesystem",options:{path:t+"/content/posts/",name:"posts"}},{resolve:"gatsby-source-filesystem",options:{path:t+"/content/images/",name:"images"}},{resolve:"gatsby-source-filesystem",options:{path:t+"/content/products/",name:"products"}},{resolve:"gatsby-transformer-remark",options:{plugins:[{resolve:"gatsby-remark-images",options:{maxWidth:750,linkImagesToOriginal:!1,wrapperStyle:"margin-bottom: 1.0725rem;"}},{resolve:"gatsby-remark-responsive-iframe",options:{wrapperStyle:"margin-bottom: 1.0725rem"}},"gatsby-remark-prismjs","gatsby-remark-copy-linked-files","gatsby-remark-smartypants"]}},{resolve:"gatsby-plugin-manifest",options:{name:"Gatstrap",short_name:"Gatstrap",description:"Gatsby starter for bootstrap a blog",homepage_url:"https://gatstrap.netlify.com",start_url:"/",background_color:"#fff",theme_color:"#673ab7",display:"standalone",icons:[{src:"/img/android-chrome-192x192.png",sizes:"192x192",type:"image/png"},{src:"/img/android-chrome-512x512.png",sizes:"512x512",type:"image/png"}]}},{resolve:"gatsby-plugin-google-analytics",options:{trackingId:""}},{resolve:"gatsby-plugin-netlify",options:{mergeSecurityHeaders:!0,mergeLinkHeaders:!0,mergeCachingHeaders:!0}},"gatsby-plugin-catch-links","gatsby-plugin-offline","gatsby-plugin-react-helmet","gatsby-plugin-react-next","gatsby-plugin-sass","gatsby-plugin-sharp","gatsby-plugin-sitemap","gatsby-plugin-twitter","gatsby-transformer-sharp","gatsby-transformer-yaml","gatsby-transformer-json"]}}).call(this,"/")},173:function(e,t,a){"use strict";a(29);var n=a(8),r=a.n(n),s=a(0),o=a.n(s),i=a(174),l=a.n(i),c=a(60),m=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.location,a=e.title;return o.a.createElement("nav",{className:"navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary"},o.a.createElement("div",{className:"container"},o.a.createElement(c.Link,{className:"text-center",to:"/"},o.a.createElement("h1",{className:"navbar-brand mb-0"},a)),o.a.createElement("div",{className:"navbar-nav-scroll"},o.a.createElement("ul",{className:"navbar-nav bd-navbar-nav flex-row"},o.a.createElement("li",{className:"/"===t.pathname?"nav-item active":"nav-item"},o.a.createElement(c.Link,{to:"/",className:"nav-link"},"Home")),o.a.createElement("li",{className:"/profile/"===t.pathname?"nav-item active":"nav-item"},o.a.createElement(c.Link,{to:"/profile/",className:"nav-link"},"Profile")))),o.a.createElement("div",{className:"navbar-nav flex-row ml-md-auto d-none d-md-flex"})))},t}(o.a.Component),p=a(168),g=a(169),u=(a(177),a(178),a(179),a(180),a(181),function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var a=t.prototype;return a.componentDidMount=function(){l.a.init()},a.componentDidUpdate=function(){l.a.init()},a.render=function(){var e=this.props.children;return o.a.createElement("div",null,o.a.createElement(m,Object.assign({title:g.siteMetadata.title},this.props)),e,o.a.createElement(p.a,{title:g.siteMetadata.title,author:g.siteMetadata.author}))},t}(o.a.Component));t.a=u}}]);
//# sourceMappingURL=component---src-templates-category-index-js-c3db84f15c6354d6fbff.js.map