async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('textarea[name="post-title"]').value.trim();
    const post_text = document.querySelector('textarea[name="post-url"]').value.trim();
    if( title !== "" || title !== null ) {
      title = document.querySelector('textarea[name="post-title"]').placeholder;
    } else if( post_text !== "" || post_text !== null) {
      post_text = document.querySelector('textarea[name="post-url"]').placeholder;
    } else {
      
    }
    console.log("--------------------------------------------------------");
    console.log(post_text);
    console.log(title);
    console.log("--------------------------------------------------------");
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  