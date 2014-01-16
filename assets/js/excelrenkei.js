function excelrenkei(){
	try {
		var excel = new ActiveXObject("Excel.Application");
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var sh = new ActiveXObject( "WScript.Shell" );
	} catch (e) {
		alert(e);
		return;
	}

	var MONTH = "8月";
	var DAY = "2日";

	try {
		var workbook = excel.Workbooks.Open(
				fso.getAbsolutePathName("設定表示ツール_出力ファイルサンプル.xls"), 0, false);
		try {
			var worksheet = workbook.Worksheets("カレンダー設定");
			var c = worksheet.Cells.Find(MONTH);
			var r = worksheet.Cells.Find(DAY);
			var value = worksheet.Cells(r.row, c.column).value;
			var new_value;
			if (value == "休日") {
				new_value = undefined;
			} else {
				new_value = "休日";
			}
			sh.Popup(MONTH + DAY + "の場所は" + c.column + "行" + r.row + "列目で" + value + "が入っていますが"
					+ (new_value == null?"空白":new_value) + "に置き換えます。");
			worksheet.Cells(r.row, c.column).value = new_value;
			workbook.Save();
			var rtn = sh.Popup("Finished!印刷しますか？",0,"確認",1);
			if (rtn == 1) worksheet.PrintOut();
		} finally {
			workbook.Close();
		}
	} finally {
		excel.Quit();
	}
}
