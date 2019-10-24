const Bootcamp = require('../models/Bootcamp')


/**
 * @description   Get all bootcamps
 * @route         GET /api/v1/bootcamps  
 * @access        Public
*/
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({ success: true, data: bootcamps })
  } catch (error) {
    res.status(400).json({ success: false })
  }
  
}

/**
 * @description   Get single bootcamp
 * @route         GET /api/v1/bootcamps/:id
 * @access        Public
*/
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (bootcamp) {
      return res.status(200).json({ success: true, data: bootcamp})
    } 
    
    throw ("Bootcamp not found")
    
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @description   Add one bootcamp
 * @route         POST /api/v1/bootcamps 
 * @access        Private
*/
exports.addBootcamp = async (req, res, next) => {
  // this is also correct. .create() triggers save() middleware
  // const bootcamp = new Bootcamp(req.body)
  // const savedBootcamp = await bootcamp.save()
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp})  
  } catch (error) {
    console.log(`Error adding bootcamp: ${error}`.red)  
    res.status(400).json({success:false})
  }
  
}

/**
 * @description   Upadate one bootcamp
 * @route         PUT /api/v1/bootcamps 
 * @access        Private
*/
exports.updateBootcamp = async (req, res, next) => {
  try {
    const fieldsToUpdate = req.body
  const {id} = req.params
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
    runValidators: true
  })

  if(!bootcamp){
    return res.status(400).json({success:false})
  }

  res.status(201).json({ success: true, data: bootcamp})
  } catch (error) {
    console.log(`Error updating bootcamp: ${error}`.red) 
    res.status(400).json({success:false})
  }
  
} 


/**
 * @description   Delete one bootcamp
 * @route         DELETE /api/v1/bootcamps/:id 
 * @access        Private
*/
exports.deleteBootcamp = async (req, res, next) => {

  try {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if(!bootcamp){
    return res.status(400).json({success:false})
  }
  res.status(200).json({ success: true, data: bootcamp})
  } catch (error) {
    console.log(`Error deleting bootcamp: ${error}`.red) 
    res.status(400).json({success:false})
  }
}
