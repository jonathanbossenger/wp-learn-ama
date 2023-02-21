/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	TextControl
} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of
 * the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {attributes, setAttributes} ) {
	return (
		<div { ...useBlockProps() }>

			<InspectorControls key="setting">
				<Panel>
					<PanelBody title="Form instructions" initialOpen={true}>
						<TextControl className="blocks-base-control__input"
									 label={"Instructions"}
									 value={attributes.instructions}
									 onChange={(val) => setAttributes({instructions: val})}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>

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
