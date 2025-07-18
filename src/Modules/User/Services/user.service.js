import { User } from '../../../DB/Models/user.model.js';


export const signUp = async (req, res) => {
try{
  const { name, email, password, role } = req.body;

  const exist = await User.findOne({ where: { email } });
  if (exist) return res.status(400).json({ error: 'Email already exists' });

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    message: 'User added successfully',
    user
  });}catch(error){
    res.status(500).json({error :error.message});
  }
};

export const CreateOrUpdate = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const { id: userId } = req.params;

    let user = await User.findByPk(userId);

    if (!user) {
      user = await User.create( 
        {id: userId, name, email, password, role,},
        { validate: false }
      );
    } else {
      if (name) user.name = name;
      if (email) user.email = email;
      if(password)user.password = password;
      if (role) user.role = role;
      await user.save({ validate: false }); 
    }

    return res.status(200).json({
      message: "User created or updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error:  error.message
    });
  }
};

export const getUserByEmail =async (req,res)=>{
    try{
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user)
    }catch(error){
    res.status(500).json({error:error.message});
    }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['role'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

