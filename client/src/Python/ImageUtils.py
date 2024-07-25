import os
from PIL import Image
import io               
import pathlib
from PIL import ImageEnhance
def resize_image(input_path, output_path, max_size):
    """Resize the image to fit within max_size, maintaining the aspect ratio."""
    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"Input file '{input_path}' does not exist.")
    if not os.path.isdir(os.path.dirname(output_path)):
        raise FileNotFoundError(f"Output directory '{os.path.dirname(output_path)}' does not exist.")
    
    try:
        with Image.open(input_path) as img:
            # Calculate the new size preserving the aspect ratio
            img.thumbnail(max_size, Image.ANTIALIAS)
            # Save the resized image
            img.save(output_path)
    except (IOError, OSError) as e:
        raise Exception(f"Failed to resize image: {str(e)}")
    
def enhance_image_color(input_path, output_path, max_size):
    """Resize the image to fit within max_size, maintaining the aspect ratio."""
    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"Input file '{input_path}' does not exist.")
    if not os.path.isdir(os.path.dirname(output_path)):
        raise FileNotFoundError(f"Output directory '{os.path.dirname(output_path)}' does not exist.")
    
    try:
        with Image.open(input_path) as img:
            # Calculate the new size preserving the aspect ratio
            enhancer = ImageEnhance.Color(img)
            enhanced_image = enhancer.enhance(1.0) 
            # Save the resized image
            img.save(output_path)
    except (IOError, OSError) as e:
        raise Exception(f"Failed to resize image: {str(e)}")    

def resize_images_in_directory(directory, max_size, output_directory=None):
    """Resize all images in a directory and save them to an output directory."""
    if output_directory is None:
        output_directory = directory

    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for filename in os.listdir(directory):
        if filename.lower().endswith(('png', 'jpg', 'jpeg', 'gif', 'bmp')):
            input_path = os.path.join(directory, filename)
            output_path = os.path.join(output_directory, filename)
            resize_image(input_path, output_path, max_size)
            print(f"Resized and saved {filename} to {output_path}")


resize_image('/home/brittany/BrainStation/Assignments/petfinder/client/src/assets/FritzDIckens.jpg', '/home/brittany/BrainStation/Assignments/petfinder/client/src/assets/FritzDIckens-resized.jpg', (400, 300))

