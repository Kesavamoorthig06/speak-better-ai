# backend/analysis/report_generator.py

def generate_report(eye_data, speech_data):
    report = {
        "Eye Contact": f"{eye_data['eye_contact_percent']}%",
        "Filler Words": speech_data["filler_count"],
        "WPM": speech_data["words_per_minute"],
        "Transcript": speech_data["transcript"]
    }
    return report
