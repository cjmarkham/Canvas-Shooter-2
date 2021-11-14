<?php

set_time_limit(0);

function loop($base = 'scripts')
{
	global $scripts;

	$skip = array(
		'easel.js',
		'soundjs.js',
		'preload.js',
		'concat.js',
		'jquery.js'
	);

	foreach (glob($base . '/*') as $file) 
	{
		if (is_dir($file))
		{
			loop($file);
		}
		else 
		{
			$filename = str_replace($base . '/', '', $file);
			if (!in_array($filename, $skip))
			{
				echo $file . '<br />';
				$scripts[] = $file;
			}
		}
	}
}

$scripts = array();

echo '-- COMPACTING -- <br />';

loop();

$fh = fopen('scripts/concat.js', 'a');

foreach ($scripts as $script)
{
	$script = file_get_contents($script);
	$ch = curl_init('http://closure-compiler.appspot.com/compile');
	 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, 'output_info=compiled_code&output_format=text&compilation_level=SIMPLE_OPTIMIZATIONS&js_code=' . urlencode($script));
	$output = curl_exec($ch);
	curl_close($ch);

	fwrite($fh, $output);
}

fclose($fh);