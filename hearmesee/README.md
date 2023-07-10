# Our Motivation
Through HearMeSee, we hope to improve the quality of life of visually-impaired individuals. This web app aims to enhance the safety, independence, and convenience of its users, through which giving peace of mind to both their caregivers and their support network. 

Currently, visually-impaired people have benefited from the presence of caregivers, assistants, guiding canes, and guide dogs. HearMeSee is not meant to replace these aids, but rather enhance and complement them. Traditional methods do have their shortfalls, with the main disadvantage being impossible for caregivers and assistants to be with the visually-handicapped individual 24/7. The use of guiding canes and guide dogs similarly are not able to provide information on obstacles, but rather only be able to alert the user of the existence of such obstacles. 

Hence, HearMeSee offers several unique ways to solve challenges faced by these individuals that may not be fully addressed by such traditional methods of using guiding canes and/or guide dogs. By leveraging cutting-edge image detection technology to identify and describe obstacles in real-time, this eliminates uncertainty associated with unidentified objects which allows users to navigate their environment more confidently. Hence, providing a more intuitive and efficient user experience.

![overview](https://drive.google.com/file/d/1-IKltcaKOfoKhSb1Mbp2iufvYTsjhoXZ/view?usp=sharing)

# High Level Overview
HearMeSee uses the TensorFlow.js library along with the COCO SSD (Common Objects in Context Single Shot MultiBox Detection) model for object detection. COCO SSD is a pre-trained deep learning model that can detect and classify various objects in real-time based on their visual features.

The COCO SSD model is based on the Single Shot MultiBox Detection (SSD) algorithm, which is a popular object detection algorithm. SSD is a one-stage object detection model that performs both object localization and classification in a single forward pass of the neural network. It uses a set of default bounding boxes at different scales and aspect ratios to predict the presence and location of objects in an input image.

In this project, the COCO SSD model is loaded using the TensorFlow.js library, and real-time object detection is performed by running the model on the video frames captured by the webcam. The detected objects are then displayed on the canvas along with their bounding boxes and labels for added clarity.

# Architecture
![overview](https://drive.google.com/file/d/1Dqbfid_J7Kecq4O9vD3RuPpXnX_8Ean7/view?usp=sharing)
The SSD architecture consists of a base convolutional neural network (CNN) backbone followed by a set of auxiliary convolutional layers. The backbone network, typically a pre-trained network like VGG16 or ResNet, extracts features from the input image and learns high-level representations. These features are then fed into the auxiliary layers, which are responsible for predicting object class labels and bounding box coordinates at multiple scales.

At each prediction scale, the SSD architecture uses a set of convolutional filters to simultaneously predict a fixed number of bounding boxes and their associated class probabilities. These bounding boxes are called "default boxes" or "anchor boxes" and are pre-defined at different aspect ratios and scales to capture objects of various sizes. The predicted class probabilities and bounding box offsets are combined to generate the final detection results.

To train the SSD model, labeled training data is used to optimize the network's parameters. During training, the model minimizes a combined loss function that includes terms for classification and localization. The classification loss measures the accuracy of predicted class labels, while the localization loss measures the accuracy of predicted bounding box coordinates.

The SSD architecture offers several advantages. It enables efficient detection by performing predictions at multiple scales in a single pass, reducing the need for multiple costly region proposals. It can handle objects of various sizes and aspect ratios, making it suitable for real-world scenarios. Additionally, SSD can be trained end-to-end, allowing for easy integration and adaptation to different tasks and datasets.

Overall, the Single Shot MultiBox Detector architecture is a powerful and widely adopted approach for object detection tasks, providing a good balance between accuracy and efficiency.
