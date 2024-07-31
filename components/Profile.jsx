import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>

      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>

      <div className='w-full flex-wrap justify-center gap-12'>
        <div className='w-1/2 mt-4'>
          <p>
            {desc}
          </p>
        </div>
        <div className='mt-10 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={() => {}}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Profile