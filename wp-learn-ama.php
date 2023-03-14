<?php
/**
 * Plugin Name:     WP Learn AMA
 * Description:     Manages AMA Questions and Answers
 * Author:          Jonathan Bossenger
 * Author URI:      https://jonthanbossenger.com
 * Text Domain:     wp-learn-ama
 * Domain Path:     /languages
 * Version:         1.1.0
 *
 * @package         WP_Learn_AMA
 */

/**
 * Activation
 */
register_activation_hook( __FILE__, 'wp_learn_question_author_role' );
function wp_learn_question_author_role() {
	add_role(
		'question_author',
		'Question Author',
		array(
			'read'                   => false,  // true allows this capability
			'edit_question'          => true,
			'edit_questions'         => true,
		)
	);
}

/**
 * Set up user cookie
 */
add_action( 'plugins_loaded', 'wp_learn_ama_cookie_init' );
function wp_learn_ama_cookie_init() {
	/**
	 * Set the application user and key as a cookie
	 */
	if ( defined( 'WP_APPLICATION_USER' ) && defined( 'WP_APPLICATION_KEY' ) ) {
		if ( ! isset( $_COOKIE['wp-learn-application'] ) ) {
			$wp_learn_application = 'Basic ' . base64_encode( WP_APPLICATION_USER . ':' . WP_APPLICATION_KEY );
			setcookie( 'wp-learn-application', $wp_learn_application, time() + 3600, '/' );
		}
	}
}

/**
 * Custom Post Type registration
 */
add_action( 'init', 'wp_learn_ama_plugin_init' );
function wp_learn_ama_plugin_init() {
	/**
	 * Register a question custom post type
	 */
	register_post_type(
		'question',
		array(
			'labels'          => array(
				'name'          => __( 'Questions' ),
				'singular_name' => __( 'Question' )
			),
			'public'          => true,
			'show_ui'         => true,
			'show_in_rest'    => true,
			'supports'        => array(
				'title',
				'editor',
				'custom-fields',
			),
            'capability_type' => 'question',
            'map_meta_cap'    => false,
		)
	);

	/**
	 * Register the email meta field on the question custom post type
	 */
	register_meta(
		'post',
		'email',
		array(
			'single'         => true,
			'type'           => 'string',
			'default'        => '',
			'show_in_rest'   => true,
			'object_subtype' => 'question',
		)
	);

    /**
     * Allow the administrator user role full access to questions
     */
    $capabilities = array(
        'edit_question',
        'read_question',
        'delete_question',
        'edit_others_questions',
        'delete_questions',
        'publish_questions',
        'read_private_questions',
        'edit_questions',
    );
	$role = get_role( 'administrator' );
    foreach ( $capabilities as $capability ) {
        $role->add_cap( $capability );
    }
}

/**
 * Register the block
 */
add_action( 'init', 'wp_learn_ama_block_init' );
function wp_learn_ama_block_init(){
	register_block_type( __DIR__ . '/build' );
}


/**
 * Enqueue Scripts and Styles
 */
add_action( 'wp_enqueue_scripts', 'wp_learn_ama_enqueue_script' );
function wp_learn_ama_enqueue_script() {

	wp_register_script(
		'wp-learn-axios',
		'https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js',
		array( 'wp-api' ),
		'1.1.2',
		true
	);
	wp_enqueue_script( 'wp-learn-axios' );

	wp_register_script(
		'wp-learn-ama',
		plugin_dir_url( __FILE__ ) . 'assets/wp-learn-ama.js',
		array( 'wp-learn-axios' ),
		time(),
		true
	);
	wp_enqueue_script( 'wp-learn-ama' );
}