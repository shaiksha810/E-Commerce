import React, { useState } from 'react';
import { Upload, X, Plus, DollarSign, Box } from 'lucide-react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;


const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports & Outdoors',
    'Toys & Games',
    'Beauty & Personal Care',
    'Food & Beverages'
  ];

  // ------------------ Handlers ------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // ✅ file preview
      if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.description.trim()) newErrors.description = 'Product description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.image) newErrors.image = 'Product image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ Submit ------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('image', formData.image);

      const response = await axios.post(
        `${API_URL}/api/admin/addProducts`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ Product created:', response.data);

      alert('Product added successfully ✅');

      setFormData({
        title: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image: null
      });
      setImagePreview(null);
    } catch (error) {
      console.error('❌ Error creating product:', error);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      image: null
    });
    setImagePreview(null);
    setErrors({});
  };

  // ------------------ UI ------------------

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new product to your store</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-lg`}
                placeholder="Enter product title"
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg`}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg`}
                placeholder="Describe your product..."
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full pl-10 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-lg`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <div className="relative">
                  <Box className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className={`w-full pl-10 py-2 border ${errors.stock ? 'border-red-300' : 'border-gray-300'} rounded-lg`}
                    placeholder="0"
                  />
                </div>
                {errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock}</p>}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              {!imagePreview ? (
                <label className={`flex flex-col items-center justify-center w-full h-48 border-2 ${errors.image ? 'border-red-300' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg border" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
