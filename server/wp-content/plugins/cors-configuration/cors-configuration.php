<?php
/*
Plugin Name: CORS Configuration
Description: Enable CORS for WordPress REST API.
Version: 1.0
Author: Your Name
*/

// Hook to modify CORS settings for the REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        // Allow requests from any origin (you can restrict to specific origins if needed)
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
}, 15);
