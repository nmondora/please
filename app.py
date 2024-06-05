from flask import Flask, request, render_template

app = Flask(__name__, template_folder='templates')

# Dictionary to store input values for each image
input_values = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.get_json()

    # Extract input values from the data
    input1 = data.get('input1')
    input2 = data.get('input2')
    input3 = data.get('input3')

    # Determine the image index
    image_index = data.get('image_index')

    # Update input values for the corresponding image
    input_values[f'image{image_index}'] = {'input1': input1, 'input2': input2, 'input3': input3}

    return {'success': True}

if __name__ == '__main__':
    app.run(debug=True)
