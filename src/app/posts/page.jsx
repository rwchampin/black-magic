'use client';
import {createClient} from '@sanity/client'

 
import { useParams } from 'next/navigation';

 
  const client = createClient({
    projectId: "cqozaegk",
    dataset: "production",
    apiVersion: "2023-05-19",
    useCdn: false
  });


 


export default async function Page(props) {
    const { slug } = useParams();
     
      // sk7FHuU91cKCBFbEpCzfsGm7kw8JllJJzTpE6jcNUA0ZHJR9jablZ8YaaUk0bKfC38ArRUQDs8qACVkanJHzGpDGHPBYUztAZxTSZYVaLE1DPspRaCclRHKS0Jyt4IshNUtHl2bXFc2vmQleH3rz6moViaQI8gko8IyD3CWtMcjrjJVJHSBf
 
      const posts  = await client.fetch(`*[_type == "post"]`);
        console.log(posts)
    return (
        <div>
            {/* {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    </div>
            ))} */}

            
        </div>
    );
                    


}
 