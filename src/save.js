/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( {attributes} ) {
	return (
		<div { ...useBlockProps.save() }>
			<div id="wp-learn-ama-response">{attributes.instructions}</div>
			<form>
				<div>
					<label htmlFor="wp-learn-ama-title">Name</label>
					<input type="text" name="title" id="wp-learn-ama-title"/>
				</div>
				<div>
					<label htmlFor="wp-learn-ama-email">Email</label>
					<input type="email" name="email" id="wp-learn-ama-email"/>
				</div>
				<div>
					<label htmlFor="wp-learn-ama-content">Content</label>
					<textarea name="content" id="wp-learn-ama-content" cols="50" rows="10"></textarea>
				</div>
				<input type="button" id="wp-learn-ama-submit" value="Submit"/>
			</form>
		</div>
	);
}
