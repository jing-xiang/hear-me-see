![model]https://github.com/jing-xiang/hear-me-see/blob/main/5649.jpg?raw=true)](https://github.com/jing-xiang/hear-me-see/blob/main/hearmesee/src/appicon.png
# HearMeSee
HearMeSee is an AI-driven application specifically designed to improve the quality of life of visually-impaired individuals. Using cutting-edge image detection and voice recognition technology, HearMeSee assists its users by identifying and providing detailed descriptions of objects or obstacles within their environment. The application delivers real-time feedback, enhancing navigation safety. With the help of HearMeSee, user independence, and convenience are promoted.


# About

HearMeSee is built using Android Studio, leveraging its comprehensive toolset and debugging capabilities. With a focus on user-centered design, we conduct extensive user research and feedback incorporation to ensure an intuitive and accessible user interface development process. Regular code reviews and automated testing to preemptively address potential issues show our commitment to providing a high-quality application. Emphasizing user-centered design, we incorporate user feedback and conduct rigorous user research to create an intuitive, accessible interface. 

We employ continuous integration, deployment pipelines, and automated testing for an efficient development cycle. User acceptance testing is used to further fine-tune the application's functionality, ensuring a reliable, user-friendly experience for visually disabled individuals.

# Features

Object Detection: Objects and obstacles near the user are located and identified in real time. By utilizing the smartphone's camera, visually disabled individuals can easily capture their surroundings about what is in front of them. This feature eliminates the uncertainty and safety hazards associated with unidentified objects, allowing users to navigate their environment more confidently.

Voice Recognition: The advanced voice recognition system seamlessly translates spoken commands into actions, making it effortless for users to interact with the application. Whether it's identifying items or exploring unfamiliar territories, HearMeSee ensures accurate recognition and effortless usability.

Real-Time Feedback: HearMeSee offers real-time audio feedback, describing objects or obstacles captured by the camera. Users receive instant and detailed information about the items in their surroundings, ensuring enhanced safety and independence. Through real-time object recognition, comprehensive audio feedback, and user-friendly accessibility, HearMeSee enhances the independence, safety, and overall quality of life for visually disabled individuals.

Location Tracking: HearMeSee empowers caregivers and family members to monitor the user's location and promptly respond to any potential hazards. By leveraging real-time tracking, hazard detection, instant notifications, and customizable settings, HearMeSee enhances the overall safety and well-being of visually 
disabled individuals, providing peace of mind for both users and their support network.

# About our model (COCO-SSD):
COCO-SSD (Common Objects in Context with Single Shot MultiBox Detector) is a popular object detection model that aims to detect and classify objects within an image. It is trained on the Microsoft Common Objects in Context (COCO) dataset, which consists of a wide range of object categories commonly found in everyday scenes.

Using COCO-SSD for object detection mainly involves several steps:

Preprocessing: Before feeding an image to the COCO-SSD model, some preprocessing steps may be required. This typically involves resizing the image to a specific input size and converting it to the appropriate format for the model.

Model Inference: Once the image is preprocessed, it is passed through the COCO-SSD model for inference. The model utilizes a Single Shot MultiBox Detector (SSD) architecture, which is a type of deep convolutional neural network (CNN) designed for real-time object detection.

Object Detection: During the inference process, the COCO-SSD model analyzes the image and generates bounding boxes around detected objects. It also predicts the class labels and confidence scores for each detected object. The bounding boxes represent the location and extent of the objects within the image, while the class labels identify the specific object category (e.g., person, car, dog) that the model believes it has detected.

Post-processing: After the COCO-SSD model generates the bounding boxes and class predictions, post-processing steps may be performed to refine the results. This can involve filtering out low-confidence detections, applying non-maximum suppression to eliminate redundant bounding boxes for the same object, and performing additional computations or analysis on the detected objects if necessary.

Visualization: The final step involves visualizing the results of object detection. This can include drawing the bounding boxes and class labels on the original image or creating a separate visualization that highlights the detected objects. The visualization helps users understand and interpret the output of the COCO-SSD model.


# Tech Stack

JavaScript: Used for scripting parts of user interface and server interactions.

NodeJS: Used to create server-side web applications.

TensorFlowJS: Used for implementing object detection and image recognition capabilities.

Google Cloud (Speech-to-Text): Used for converting voice commands into text for processing.

Firebase: Used for authentication of users and storing of user information (in Firebase Realtime Database)

React: Used for developing parts of the application's user interface.


See(or hear) it for yourself at https://hearmesee.netlify.app/
