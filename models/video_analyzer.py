import whisper
from transformers import pipeline
import argparse
import os
from abc import ABC, abstractmethod

class TranscriptionStrategy(ABC):
    @abstractmethod
    def transcribe(self, video_path):
        pass

class WhisperTranscriptionStrategy(TranscriptionStrategy):
    def __init__(self, model_size="base"):
        self.model = whisper.load_model(model_size)
    
    def transcribe(self, video_path):
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found: {video_path}")
            
        print(f"Transcribing {video_path} with Whisper...")
        result = self.model.transcribe(video_path)
        return result["text"]

class SummarizationStrategy(ABC):
    @abstractmethod
    def summarize(self, text):
        pass

class BartSummarizationStrategy(SummarizationStrategy):
    def __init__(self):
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    def summarize(self, text):
        summary = self.summarizer(text, max_length=130, min_length=30, do_sample=False)
        return summary[0]['summary_text']

class VideoAnalyzer:
    def __init__(self, transcription_strategy=None, summarization_strategy=None):
        self.transcription_strategy = transcription_strategy
        self.summarization_strategy = summarization_strategy or BartSummarizationStrategy()
        
    def set_transcription_strategy(self, strategy):
        self.transcription_strategy = strategy
        
    def set_summarization_strategy(self, strategy):
        self.summarization_strategy = strategy

    def analyze_video(self, video_path):
        transcription = self.transcription_strategy.transcribe(video_path)
        summary = self.summarization_strategy.summarize(transcription)

        return summary

def main():
    parser = argparse.ArgumentParser(description='Video Analysis Script')
    parser.add_argument('video_path', type=str, help='Path to the video file')
    parser.add_argument('--output', type=str, help='Output JSON file path', default='output.json')

    args = parser.parse_args()

    # # Default analyzer with default strategies
    # transcription_strategy = WhisperTranscriptionStrategy()
    # summarization_strategy = BartSummarizationStrategy()

    # analyzer = VideoAnalyzer(transcription_strategy, summarization_strategy)
    try:
        # result = analyzer.analyze_video(args.video_path)
        
        # # Save results to a text file
        # with open(args.output, 'w', encoding='utf-8') as f:
        #     f.write(result)
            
        print(f"Analysis completed. Results saved to {args.output}")
        
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        raise

if __name__ == "__main__":
    main()
