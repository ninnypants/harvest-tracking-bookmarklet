( function(){
	var data,
	projectName,
	todoName,
	url,
	harvestUrl = 'https://platform.harvestapp.com/platform/timer?app_name=Basecamp&service=basecamp.com&base_url=#BASEURL#&format=platform&external_account_id=#ACCOUNTID#&external_group_id=#PROJECTID#&external_group_name=#PROJECTNAME#&external_item_id=#TODOID#&external_item_name=#TODONAME#',
	iframe,
	iframeWidth = 500,
	iframeHeight = 320,
	iframeContainer;

	url = window.location.toString();

	if ( url.match( /basecamp\.com/ ) ) {
		data = url.match( /basecamp.com\/(\d+)\/projects\/(\d+)\/todos\/(\d+)/ );

		// we aren't on a todo page
		if ( 4 != data.length ) {
			return;
		}

		accountID   = data[1];
		projectID   = data[2];
		todoID      = data[3];
		projectName = document.querySelector( 'a[href="/' + data[1] + '/projects/' + data[2] + '"]' ).textContent;
		todoName    = document.querySelector( '#todo_' + data[3] + ' .wrapper .content_for_perma' ).textContent;
	}

	harvestUrl = harvestUrl.replace( '#ACCOUNTID#', encodeURIComponent( accountID ) );
	harvestUrl = harvestUrl.replace( '#PROJECTID#', encodeURIComponent( projectID ) );
	harvestUrl = harvestUrl.replace( '#PROJECTNAME#', encodeURIComponent( projectName ) );
	harvestUrl = harvestUrl.replace( '#TODOID#', encodeURIComponent( todoID ) );
	harvestUrl = harvestUrl.replace( '#TODONAME#', encodeURIComponent( todoName ) );
	harvestUrl = harvestUrl.replace( '#BASEURL#', encodeURIComponent( url ) );

	iframe = document.createElement( 'iframe' );
	iframe.setAttribute( 'width', iframeWidth );
	iframe.setAttribute( 'height', iframeHeight );
	iframe.setAttribute( 'src', harvestUrl );
	iframe.style.position = 'absolute';
	iframe.style.top = '50%';
	iframe.style.left = '50%';
	iframe.style.transform = 'translate( -50%, -50% )';

	iframeContainer = document.createElement( 'div' );
	iframeContainer.style.width = iframeContainer.style.height = '100%';
	iframeContainer.style.position = 'fixed';
	iframeContainer.style.top = 0;
	iframeContainer.style.left = 0;
	iframeContainer.style.background = 'rgba( 0, 0, 0, 0.25 )';
	iframeContainer.style.zIndex = 1000;

	iframeContainer.appendChild( iframe );
	document.body.appendChild( iframeContainer );

	iframeContainer.addEventListener( 'click', function( e ) {
		if ( e.target != iframeContainer ) {
			return;
		}

		e.preventDefault();
		iframeContainer.remove();
	} );
} )();
