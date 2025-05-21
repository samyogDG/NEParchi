<?php
/*
Plugin Name: Custom Article Submission
Description: A plugin to handle article submissions from ReactJS form and display them in the WordPress dashboard.
Version: 1.0
Author: Your Name
*/

// Register the custom REST API route
add_action('rest_api_init', function () {
    register_rest_route('neparchi/v1', '/submit-article', array(
        'methods' => 'POST',
        'callback' => 'handle_article_submission',
        'permission_callback' => '__return_true' // You can add custom permission handling here
    ));
});

// Callback function to handle the form submission
function handle_article_submission($request) {
    $params = $request->get_params();

    // Sanitize and extract the form data
    $article = sanitize_text_field($params['article']);
    $fullName = sanitize_text_field($params['fullName']);
    $contact = sanitize_text_field($params['contact']);
    $email = sanitize_email($params['email']);

    // Prepare post data for custom post type 'submitted_articles'
    $post_data = array(
        'post_title'    => $fullName . ' - ' . substr($article, 0, 50), // Use the full name and a snippet of the article as the title
        'post_content'  => $article,
        'post_status'   => 'pending', // Set status to 'pending' for review before publishing
        'post_author'   => 1,  // Change to the ID of the user you want to assign the post to
        'post_type'     => 'submitted_articles', // Custom post type
        'meta_input'    => array(
            'contact' => $contact,
            'email'   => $email,
        ),
    );

    // Insert the post into the database
    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        return new WP_Error('submission_failed', 'Failed to submit the article', array('status' => 500));
    }

    return new WP_REST_Response('Article submitted successfully!', 200);
}

// Create custom post type for articles
add_action('init', function () {
    $labels = array(
        'name'               => 'Submitted Articles',
        'singular_name'      => 'Submitted Article',
        'menu_name'          => 'Submitted Articles',
        'name_admin_bar'     => 'Submitted Article',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Article',
        'new_item'           => 'New Article',
        'edit_item'          => 'Edit Article',
        'view_item'          => 'View Article',
        'all_items'          => 'All Articles',
        'search_items'       => 'Search Articles',
        'parent_item_colon'  => 'Parent Articles:',
        'not_found'          => 'No articles found.',
        'not_found_in_trash' => 'No articles found in Trash.',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'submitted_articles'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array('title', 'editor', 'author', 'custom-fields'),
    );

    register_post_type('submitted_articles', $args);
});
