const app = firebase.initializeApp(firebaseConfig);
console.log(app);
const database = firebase.database();

const publishBlog = () => {
    let blogInfo = {
        title: document.getElementById('placeholder1').value,
        para: document.getElementById('placeholder2').value,
    };
    const uploadFolder = database.ref('uploaded_Blogs');
    uploadFolder
        .push(blogInfo)
        .then((snapshot) => {
            console.log(snapshot);
            console.log('Blog added successfully');
            getBlog(); // Fetch and display the blogs after adding
        })
        .catch((error) => {
            console.log(error);
        });
};

const getBlog = () => {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = ''; // Clear previous content

    const uploadFolder = database.ref('uploaded_Blogs');
    uploadFolder
        .once('value')
        .then((snapshot) => {
            const Blogs = [];

            snapshot.forEach((childSnapshot) => {
                let data = childSnapshot.val();
                Blogs.push(data);
            });

            Blogs.forEach((blog) => {
                const data = `<div class="blog"> 
                    <h1>${blog.title}</h1>
                    <p>${blog.para}</p>
                </div>`;
                blogContainer.innerHTML += data;
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

// Fetch and display blogs when the page loads
getBlog();
