javascript:(function(){var%20e,t,o,n,r,a,l="https://platform.harvestapp.com/platform/timer?app_name=Basecamp&service=basecamp.com&base_url=#BASEURL#&format=platform&external_account_id=#ACCOUNTID#&external_group_id=#PROJECTID#&external_group_name=#PROJECTNAME#&external_item_id=#TODOID#&external_item_name=#TODONAME#",c=500,p=320;n=window.location.toString(),e=n.match(/basecamp.com\/(\d+)\/projects\/(\d+)\/todos\/(\d+)/),4==e.length&&(t=document.querySelector('a[href="/'+e[1]+"/projects/"+e[2]+'"]').textContent,o=document.querySelector("#todo_"+e[3]+"%20.wrapper%20.content_for_perma").textContent,l=l.replace("#ACCOUNTID#",e[1]),l=l.replace("#PROJECTID#",e[2]),l=l.replace("#PROJECTNAME#",encodeURIComponent(t)),l=l.replace("#TODOID#",e[3]),l=l.replace("#TODONAME#",encodeURIComponent(o)),l=l.replace("#BASEURL#",encodeURIComponent(n)),r=document.createElement("iframe"),r.setAttribute("width",c),r.setAttribute("height",p),r.setAttribute("src",l),r.style.position="absolute",r.style.top="50%",r.style.left="50%",r.style.transform="translate(%20-50%,%20-50%%20)",a=document.createElement("div"),a.style.width=a.style.height="100%",a.style.position="fixed",a.style.top=0,a.style.left=0,a.style.background="rgba(%200,%200,%200,%200.25%20)",a.style.zIndex=100,a.appendChild(r),document.body.appendChild(a),a.addEventListener("click",function(e){e.target==a&&(e.preventDefault(),a.remove())}))})();