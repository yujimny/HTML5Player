function excelrenkei(){
	try {
		var excel = new ActiveXObject("Excel.Application");
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var sh = new ActiveXObject( "WScript.Shell" );
	} catch (e) {
		alert(e);
		return;
	}

	var MONTH = "8��";
	var DAY = "2��";

	try {
		var workbook = excel.Workbooks.Open(
				fso.getAbsolutePathName("�ݒ�\���c�[��_�o�̓t�@�C���T���v��.xls"), 0, false);
		try {
			var worksheet = workbook.Worksheets("�J�����_�[�ݒ�");
			var c = worksheet.Cells.Find(MONTH);
			var r = worksheet.Cells.Find(DAY);
			var value = worksheet.Cells(r.row, c.column).value;
			var new_value;
			if (value == "�x��") {
				new_value = undefined;
			} else {
				new_value = "�x��";
			}
			sh.Popup(MONTH + DAY + "�̏ꏊ��" + c.column + "�s" + r.row + "��ڂ�" + value + "�������Ă��܂���"
					+ (new_value == null?"��":new_value) + "�ɒu�������܂��B");
			worksheet.Cells(r.row, c.column).value = new_value;
			workbook.Save();
			var rtn = sh.Popup("Finished!������܂����H",0,"�m�F",1);
			if (rtn == 1) worksheet.PrintOut();
		} finally {
			workbook.Close();
		}
	} finally {
		excel.Quit();
	}
}
