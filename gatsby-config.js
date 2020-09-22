const dotenv = require('dotenv')

if (process.env.ENVIRONMENT !== 'production') {
	dotenv.config()
}

module.exports = {
	siteMetadata: {
		baseUrl: 'https://rockstarlifestyle.nl',
		title: `Rockstar Lifestyle`,
		description: `Description`,
		author: `@tijsluitse`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				useMozJpeg: false,
				stripMetadata: true,
				defaultQuality: 100
			}
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.SPACE_ID,
				accessToken: process.env.DELIVERY_ACCESS_TOKEN
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon.png`
			}
		},
		{
			resolve: `gatsby-plugin-modal-routing`,
			options: {
				appElement: '#___gatsby',
				modalProps: {
					closeTimeoutMS: 500,
					className: `popup-modal`
				}
			}
		},
		`gatsby-plugin-netlify`,
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /images/
				}
			}
		},
		{
			resolve: `gatsby-source-instagram`,
			options: {
				username: `1481082465`,
				instagram_id: `17841401753973141`,
				access_token: `EAAKdmNVgv18BAAXravubSutE4FdwmLtflJsM63WbMbH4QObvZBaoAXLzuc8Yj2f2ZAR1qCjVMfrGWjUDoYtaTMuidHSYibZBMuCk3KQ9XVgZCeMB0mENCn4cr1M2RCuavYApC5qszTgMkPPPiOA4q2PqoEGMP2sYmUmlS88GtQZDZD`,
				paginate: 500,
				maxPosts: 500
			}
		}, {
			resolve: `gatsby-source-instagram`,
			options: {
			  	username: `2610360`
			}
		}
	]
}
