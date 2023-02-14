<?php
/**
 * Plugin Name:     WP Learn AMA
 * Description:     Manages AMA Questions and Answers
 * Author:          Jonathan Bossenger
 * Author URI:      https://jonthanbossenger.com
 * Text Domain:     wp-learn-ama
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         WP_Learn_AMA
 */


add_action( 'wp_enqueue_scripts', 'wp_learn_ama_enqueue_script' );
function wp_learn_ama_enqueue_script() {
	wp_register_script(
		'wp-learn-ama',
		plugin_dir_url( __FILE__ ) . 'assets/wp-learn-ama.js',
		array( 'wp-api' ),
		time(),
		true
	);
	wp_enqueue_script( 'wp-learn-ama' );
}

add_action( 'init', 'wp_learn_ama_plugin_init' );
function wp_learn_ama_plugin_init() {
    /**
     * Set the application user and key as a cookie
     */
	$wp_learn_application = base64_encode( WP_APPLICATION_USER . ':' . WP_APPLICATION_KEY);
	setcookie( 'wp-learn-application', $wp_learn_application, time() + 3600, '/' );

	/**
	 * Register a question custom post type
	 */
	register_post_type(
		'question',
		array(
			'labels'       => array(
				'name'          => __( 'Questions' ),
				'singular_name' => __( 'Question' )
			),
			'public'       => true,
			'show_ui'      => true,
			'show_in_rest' => true,
			'supports'     => array(
				'title',
				'editor',
				'custom-fields',
			),
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
}

add_shortcode('wp_learn_ama', 'wp_learn_ama_shortcode' );
function wp_learn_ama_shortcode(){
	ob_start();
	?>
	<div id="wp-learn-ama">
		<h2>Ask a Question</h2>
		<form>
			<label for="wp-learn-ama-title">Name</label>
			<input type="text" name="title" id="wp-learn-ama-title" />
			<label for="wp-learn-ama-email">Email</label>
			<input type="email" name="email" id="wp-learn-ama-email" />
			<label for="wp-learn-ama-content">Content</label>
			<textarea name="content" id="wp-learn-ama-content"></textarea>
			<input type="button" id="wp-learn-ama-submit" value="Submit" />
		</form>
		<div id="wp-learn-ama-response"></div>
	</div>
	<?php
	return ob_get_clean();
}